import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { HighchartsChartComponent } from '../../../shared/components/highcharts-chart/highcharts-chart.component';
import { CountBackBar } from '../../../core/services/fintacharts-api/models/count-back-bar.interface';

@Component({
  selector: 'app-assets-chart',
  standalone: true,
  imports: [HighchartsChartComponent],
  templateUrl: './asset-chart.component.html',
  styleUrl: './asset-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetChartComponent {
  countBackBars = input<CountBackBar[] | null>([]);

  chartOptions = computed(
    (): Highcharts.Options => ({
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: 'Historical Price',
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%e. %b',
          month: '%b %Y',
          year: '%Y',
        },
      },
      series: [
        {
          type: 'candlestick',
          name: 'Historical Price',
          data: this.countBackBars()?.map(bar => [Date.parse(bar.t), bar.o, bar.h, bar.l, bar.c]) || [],
          tooltip: {
            valueDecimals: 5,
          },
        },
      ],
      legend: {
        enabled: false,
      },
    })
  );
}
