import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-highcharts-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './highcharts-chart.component.html',
  styleUrl: './highcharts-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighchartsChartComponent {
  chartOptions = input.required<Highcharts.Options>();
  Highcharts: typeof Highcharts = Highcharts;
}
