import { TracingOverviewCheckpointColumn } from '@ocfe-shared/types/tracing/overview/tracing-overview-checkpoint-column.type';

export interface TracingOverviewCheckpoint {
  title: string;
  totalTime: number;
  totalCount: number;
  columns: TracingOverviewCheckpointColumn[];
}
