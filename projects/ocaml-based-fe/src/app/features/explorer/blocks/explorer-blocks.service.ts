import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ExplorerBlock } from '@ocfe-shared/types/explorer/blocks/explorer-block.type';
import { GraphQLService } from '@ocfe-core/services/graph-ql.service';
import { ONE_BILLION, toReadableDate } from '@openmina/shared';
import { ExplorerBlockTx } from '@ocfe-shared/types/explorer/blocks/explorer-block-tx.type';
import { ExplorerBlockZkApp } from '@ocfe-shared/types/explorer/blocks/explorer-block-zk-app-type';

@Injectable({
  providedIn: 'root',
})
export class ExplorerBlocksService {

  constructor(private graphQL: GraphQLService) { }

  getBlocks(): Observable<ExplorerBlock[]> {
    return this.graphQL.query('getBlocks', `{
        bestChain {
          protocolState {
            blockchainState {
              snarkedLedgerHash
              stagedLedgerHash
              date
            }
            consensusState {
              blockHeight
              slotSinceGenesis
            }
          }
          transactions {
            userCommands {
              nonce
            }
            feeTransfer {
              fee
            }
          }
          stateHash
          snarkJobs
        }
      }`)
      .pipe(
        map((response: any) => (response.bestChain || []).map((chain: any) => ({
          height: Number(chain.protocolState.consensusState.blockHeight),
          globalSlot: Number(chain.protocolState.consensusState.slotSinceGenesis),
          hash: chain.stateHash,
          txCount: chain.transactions.userCommands.length,
          totalTxCount: chain.transactions.userCommands.length + chain.transactions.feeTransfer.length + 1,
          snarkCount: chain.snarkJobs.length,
          zkAppsCount: 0,
          date: toReadableDate(chain.protocolState.blockchainState.date),
          timestamp: chain.protocolState.blockchainState.date,
          snarkedLedgerHash: chain.protocolState.blockchainState.snarkedLedgerHash,
          stagedLedgerHash: chain.protocolState.blockchainState.stagedLedgerHash,
        } as ExplorerBlock))),
      );
  }

  getTxs(height: number): Observable<ExplorerBlockTx[]> {
    return this.graphQL.query('getTxs', `{ block(height: ${height}) {
        transactions {
          userCommands {
            to
            from
            amount
            fee
            id
            hash
            memo
            nonce
          }
        }
      }}`)
      .pipe(
        map((response: any) => response.block.transactions.userCommands || []),
        map((txs: any[]) => txs.map((tx: any) => ({
          ...tx,
          amount: Number(tx.amount) / ONE_BILLION,
          fee: Number(tx.fee) / ONE_BILLION,
        }))),
      );
  }

  getZkApps(height: number): Observable<ExplorerBlockZkApp[]> {
    return this.graphQL.query<any>('getZkApps', this.zkAppQuery(height)).pipe(
      map((response: any) => (response.block.transactions.zkappCommands || []).map((zk: any) => ({
        id: zk.id,
        hash: zk.hash,
        updates: zk.zkappCommand.accountUpdates.length,
        failures: zk.failureReason.length,
        zkAppFullData: {
          ...zk,
          id: zk.id.slice(0, 6) + '...' + zk.id.slice(zk.id.length - 6),
        },
      }))),
    );
  }

  private zkAppQuery(height: number): string {
    return `{ block(height: ${height}) {
    transactions {
      zkappCommands {
        id
        hash
        zkappCommand {
          memo
          feePayer {
            authorization
            body {publicKey validUntil nonce fee}
          }
          accountUpdates {
            body {
              callDepth
              callData
              actions
              events
              implicitAccountCreationFee
              incrementNonce
              tokenId
              publicKey
              useFullCommitment
              update {
                appState
                delegate
                zkappUri
                votingFor
                verificationKey {hash data}
                timing {
                  vestingIncrement
                  vestingPeriod
                  initialMinimumBalance
                  cliffTime
                  cliffAmount
                }
                tokenSymbol
                permissions {
                  setZkappUri
                  setVotingFor
                  setVerificationKey
                  setTokenSymbol
                  setTiming
                  setPermissions
                  setDelegate
                  send
                  receive
                  incrementNonce
                  editState
                  editActionState
                  access
                }
              }
              preconditions {
                validWhile {upper lower}
                network {
                  nextEpochData {
                    startCheckpoint
                    seed
                    lockCheckpoint
                    ledger {hash totalCurrency {upper lower}}
                    epochLength {upper lower}
                  }
                  minWindowDensity {upper lower}
                  globalSlotSinceGenesis {upper lower}
                  blockchainLength {upper lower}
                  totalCurrency {upper lower}
                  stakingEpochData {
                    seed
                    startCheckpoint
                    lockCheckpoint
                    epochLength {upper lower}
                    ledger {hash totalCurrency {upper lower}}
                  }
                  snarkedLedgerHash
                }
                account {
                  actionState
                  provedState
                  receiptChainHash
                  state
                  isNew
                  delegate
                  nonce {upper lower}
                  balance {upper lower}
                }
              }
              mayUseToken {parentsOwnToken inheritFromParent}
              balanceChange {sgn magnitude}
              authorizationKind {verificationKeyHash isSigned isProved}
            }
            authorization {signature proof}
          }
        }
        failureReason {index failures}
      }
    }
      }}`;
  }
}


