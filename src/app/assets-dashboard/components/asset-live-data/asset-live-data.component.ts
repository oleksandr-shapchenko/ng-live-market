import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AssetLiveData } from '../../../core/services/fintacharts-ws/models/asset-live-data.interface';

@Component({
  selector: 'app-asset-live-data',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './asset-live-data.component.html',
  styleUrl: './asset-live-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetLiveDataComponent {
  public readonly symbol = input<string>();
  public readonly liveData = input.required<AssetLiveData | null>();
}
