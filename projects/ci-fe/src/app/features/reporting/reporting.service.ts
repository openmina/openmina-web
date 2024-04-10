import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Report } from '@cife-shared/types/reporting/report.type';
import { ReportDetail } from '@cife-shared/types/reporting/report-detail.type';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '@cife-shared/constants/config';
import { ReportBar } from '@cife-shared/types/reporting/report-bar.type';
import { ONE_THOUSAND, toReadableDate } from '@openmina/shared';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {

  constructor(private http: HttpClient) {}

  getReports(filters: string[]): Observable<Report[]> {
    let url = CONFIG.aggregator + '/builds';
    if (filters.length) {
      url += `?status=${filters.join(',')}`;
    }

    return this.http.get<ReportResponse[]>(url)
      .pipe(
        map((reports: ReportResponse[]) => this.mapReports(reports)),
      );
  }

  getReportDetail(number: number): Observable<ReportDetail> {
    return this.http.get<ReportDetailResponse[]>(CONFIG.aggregator + '/builds/' + number + '/blocks').pipe(
      map((response: ReportDetailResponse[]) => this.mapReportDetail(response)),
    );
  }

  getReportsComparison(ids: [number, number]): Observable<Report[]> {
    let url = CONFIG.aggregator + '/builds?status=success,failure,running,pending,killed';
    return this.http.get<ReportResponse[]>(url)
      .pipe(
        map((reports: ReportResponse[]) => this.mapReports([
          reports.find(report => report.number === ids[0]),
          reports.find(report => report.number === ids[1]),
        ])),
      );
  }

  private mapReports(reports: ReportResponse[]): Report[] {
    return reports.map((report: ReportResponse, i: number) => {
      const applicationTimesBars = this.getRanges(report.application_times);
      const productionTimesBars = this.getRanges(report.production_times);
      const receiveLatenciesBars = this.getRanges(report.receive_latencies);
      return ({
        number: report.number,
        message: report.message,
        commit: report.commit,
        branch: report.branch,
        started: toReadableDate(report.started * ONE_THOUSAND, 'HH:mm:ss, dd MMM yy'),
        timestamp: report.started * ONE_THOUSAND,
        timeAgo: this.getTimeAgo(report.started),
        status: report.status,
        blockCount: report.block_count,
        transactions: report.tx_count || 0,
        canonicalBlockCount: report.cannonical_block_count,
        requestTimeoutCount: report.request_timeout_count,
        requestCount: report.request_count,

        blockProductionMin: parseFloat(report.block_production_min.toFixed(1)),
        blockProductionAvg: parseFloat(report.block_production_avg.toFixed(1)),
        blockProductionMax: parseFloat(report.block_production_max.toFixed(1)),
        blockApplicationMin: parseFloat(report.block_application_min.toFixed(1)),
        blockApplicationAvg: parseFloat(report.block_application_avg.toFixed(1)),
        blockApplicationMax: parseFloat(report.block_application_max.toFixed(1)),
        latencyMin: parseFloat(report.receive_latency_min.toFixed(1)),
        latencyAvg: parseFloat(report.receive_latency_avg.toFixed(1)),
        latencyMax: parseFloat(report.receive_latency_max.toFixed(1)),

        applicationTimes: report.application_times,
        productionTimes: report.production_times,
        receiveLatencies: report.receive_latencies,

        applicationTimesBars,
        productionTimesBars,
        receiveLatenciesBars,
        applicationTimesDeltaBars: this.getDeltaTimes(applicationTimesBars, this.getRanges(reports[i + 1]?.application_times ?? [])),
        productionTimesDeltaBars: this.getDeltaTimes(productionTimesBars, this.getRanges(reports[i + 1]?.production_times ?? [])),
        receiveLatenciesDeltaBars: this.getDeltaTimes(receiveLatenciesBars, this.getRanges(reports[i + 1]?.receive_latencies ?? [])),

        blockApplicationMinDelta: parseFloat(report.block_application_min_delta.toFixed(1)),
        blockApplicationAvgDelta: parseFloat(report.block_application_avg_delta.toFixed(1)),
        blockApplicationMaxDelta: parseFloat(report.block_application_max_delta.toFixed(1)),
        blockProductionMinDelta: parseFloat(report.block_production_min_delta.toFixed(1)),
        blockProductionAvgDelta: parseFloat(report.block_production_avg_delta.toFixed(1)),
        blockProductionMaxDelta: parseFloat(report.block_production_max_delta.toFixed(1)),
        receiveLatencyAvgDelta: parseFloat(report.receive_latency_avg_delta.toFixed(1)),
        receiveLatencyMaxDelta: parseFloat(report.receive_latency_max_delta.toFixed(1)),
        receiveLatencyMinDelta: parseFloat(report.receive_latency_min_delta.toFixed(1)),

        isRegression: !report.block_production_regression || !report.block_application_regression || !report.receive_latency_regression,
      });
    });
  }

  private mapReportDetail(details: ReportDetailResponse[]): ReportDetail {
    return {
      blocks: details.map((block: ReportDetailResponse) => ({
        height: block.height,
        blockHash: block.block_hash,
        globalSlot: Number(block.global_slot),
        transactions: block.tx_count,
        maxReceiveLatency: block.max_receive_latency,
        datetime: toReadableDate(block.date_time * ONE_THOUSAND, 'HH:mm:ss, dd MMM yy'),
        blockProducer: block.block_producer,
        blockProducerNodes: block.block_producer_nodes,
        blockProducerNodesLength: block.block_producer_nodes.length,
        peerTimings: block.peer_timings.map(peerTiming => ({
          node: peerTiming.node,
          nodeSort: parseInt(peerTiming.node.match(/\d+/)![0]) + this.addToSort(peerTiming),
          receiveLatency: peerTiming.receive_latency,
          blockProcessingTime: peerTiming.block_processing_time,
        })),
      })),
    };
  }

  private addToSort(peerTiming: { node: string; block_processing_time: number; receive_latency: number }): number {
    if (peerTiming.node.includes('prod')) {
      return 1000;
    } else if (peerTiming.node.includes('seed')) {
      return 2000;
    } else if (peerTiming.node.includes('snarker')) {
      return 3000;
    } else {
      return 0;
    }
  }

  private getTimeAgo(timestamp: number): string {
    const timeAgo = new Date().getTime() - (timestamp * ONE_THOUSAND);
    const seconds = Math.floor(timeAgo / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return seconds + ' second' + this.getPluralS(seconds);
    } else if (minutes < 60) {
      return minutes + ' minute' + this.getPluralS(minutes);
    } else if (hours < 24) {
      return hours + ' hour' + this.getPluralS(hours);
    } else if (days < 7) {
      return days + ' day' + this.getPluralS(days);
    } else if (weeks < 4) {
      return weeks + ' week' + this.getPluralS(weeks);
    } else if (months < 12) {
      return months + ' month' + this.getPluralS(months);
    } else {
      return years + ' year' + this.getPluralS(years);
    }
  }

  private getPluralS(n: number): string {
    return n === 1 ? '' : 's';
  }

  private getRanges(latencies: number[]): ReportBar[] {
    if (latencies.length === 0) {
      return [];
    }
    const result = Array(50).fill(0).map((n: number, i: number) => ({ count: 0, range: i }));
    for (let i = 0; i < latencies.length; i++) {
      const number = latencies[i];
      for (let j = 0; j < result.length; j++) {
        if (number <= result[j].range || j === result.length - 1) {
          result[j].count++;
          break; // Exit the loop once the correct range is found
        }
      }
    }
    return result;
  }

  private getDeltaTimes(current: ReportBar[], previous: ReportBar[]): ReportBar[] {
    if (previous.length === 0) {
      return current;
    }
    return current.map((curr: ReportBar, i: number) => {
      return {
        ...curr,
        count: curr.count - previous[i].count,
      };
    });
  }
}

interface ReportResponse {
  number: number;
  commit: string;
  status: 'success' | 'running' | 'pending' | 'failure' | 'killed';
  started: number;
  message: string;
  branch: string;
  block_count: number;
  cannonical_block_count: number;
  tx_count: number;
  request_timeout_count: number;
  request_count: number;
  block_production_min: number;
  block_production_avg: number;
  block_production_max: number;
  block_application_min: number;
  block_application_avg: number;
  block_application_max: number;
  receive_latency_min: number;
  receive_latency_avg: number;
  receive_latency_max: number;
  application_times: any[];
  production_times: any[];
  receive_latencies: any[];
  block_production_min_delta: number;
  block_production_avg_delta: number;
  block_production_max_delta: number;
  block_application_min_delta: number;
  block_application_avg_delta: number;
  block_application_max_delta: number;
  receive_latency_min_delta: number;
  receive_latency_avg_delta: number;
  receive_latency_max_delta: number;
  application_times_previous: number[];
  production_times_previous: number[];
  receive_latencies_previous: number[];
  block_production_regression: boolean;
  block_application_regression: boolean;
  receive_latency_regression: boolean;
}

interface ReportDetailResponse {
  height: number;
  block_hash: string;
  global_slot: string;
  tx_count: number;
  max_receive_latency: number;
  date_time: number;
  block_producer: string;
  block_producer_nodes: string[];
  peer_timings: {
    node: string;
    block_processing_time: number;
    receive_latency: number;
  }[];
}
