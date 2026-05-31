import { DeadlinePressureModel } from '../project.model';

export function getDeadlinePressure(startDate: Date, deadline: Date): DeadlinePressureModel {
  const totalDuration = deadline.getTime() - startDate.getTime();
  const elapsedDuration = Date.now() - startDate.getTime();
  const elapsedPercentage = elapsedDuration / totalDuration;
  const remainingPercentage = 1 - elapsedPercentage;

  if (remainingPercentage > 0.5) {
    return 'healthy';
  }

  if (remainingPercentage > 0.25) {
    return 'stable';
  }

  if (remainingPercentage > 0.1) {
    return 'warning';
  }

  if (remainingPercentage > 0) {
    return 'critical';
  }

  return 'overdue';
}
