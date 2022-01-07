/**
 * 倒计时状态
 */
 export enum CountdownStates {
  PENDING = 'pending', // 无监听状态
  RESET = 'reset',
  START = 'start',
  RUNNING = 'running',
  STOPPED = 'stopped',
}
/**
 * 运行返回数据
 */
export type RunningReturn = Record<
  'day' | 'hour' | 'minute' | 'second' | 'millisecond',
  number | string
>;
/**
 * 事件类型
 */
type DefaultFunctionType = (...args: any[]) => void;
type RunningFunctionType = (param: RunningReturn) => void;

type FunctionInArrayTroughCountdownStatesType<T extends CountdownStates> =
  Array<
    T extends CountdownStates.RUNNING
      ? RunningFunctionType
      : DefaultFunctionType
  >;

type OnEventsWithCountdownStatesType = {
  [key in CountdownStates]?: FunctionInArrayTroughCountdownStatesType<key>;
};

function zeroPadding(num: number): string {
  return `0${num}`.slice(-2);
}

export class CountdownCore {
  private static _MILLISECOND = 1 * 100;
  private static _SECOND = 10 * CountdownCore._MILLISECOND;
  private static _MINUTE = 60 * CountdownCore._SECOND;
  private static _HOUR = 60 * CountdownCore._MINUTE;
  private static _DAY = 60 * CountdownCore._HOUR;
  private _state: CountdownStates;
  private _endTime: number;
  private _speed: number;
  private _remainTime: number;
  private _timer: number | null = null;
  private _date: number = 0;
  private _diffTime: number;
  private _onEvents: OnEventsWithCountdownStatesType = {};

  /**
   * @param endTimeF
   * @param speed  单位ms且最小为100ms
   */
  constructor(endTime: number, speed = 1000) {
    this._state = CountdownStates.PENDING;

    if (typeof endTime !== 'number' || typeof speed !== 'number') {
      throw new TypeError('endTime or speed must be a number');
    }
    this._endTime = endTime;
    this._remainTime = endTime;
    this._speed = speed < 100 ? 100 : speed;
    this._diffTime = this._speed;
  }

  public start(): void {
    if (this._state !== CountdownStates.RUNNING && this._remainTime !== 0) {
      this._state = CountdownStates.RUNNING;

      this._emit(CountdownStates.START);

      this._timer = setTimeout(() => {
        this._countdown();
      }, this._speed);
    }
  }

  public stop(): void {
    if (this._state !== CountdownStates.STOPPED) {
      this._state = CountdownStates.STOPPED;
      this._timer && clearTimeout(this._timer);
      this._timer = null;
      this._emit(this._state);
    }
  }

  public reset(): void {
    if (this._state !== CountdownStates.RESET) {
      this._state = CountdownStates.RESET;
      this._timer && clearTimeout(this._timer);
      this._timer = null;
      this._remainTime = this._endTime;
      this._emit(this._state);
    }
  }

  public on(type: CountdownStates, handler: DefaultFunctionType) {
    let handlerList = this._onEvents.hasOwnProperty(type)
      ? [...(this._onEvents[type] as Array<DefaultFunctionType>), handler]
      : [handler];
    this._onEvents[type] = handlerList;
  }

  private _countdown(): void {
    this._timer && clearTimeout(this._timer);
    if (this._state !== CountdownStates.RUNNING) {
      return;
    }

    this._date = Date.now();
    this._remainTime = Math.max(
      this._remainTime - Math.max(this._diffTime, this._speed),
      0,
    );
    this._diffTime = this._speed;

    this._emit(this._state, this._computed(this._remainTime));

    if (this._remainTime === 0) {
      this.stop();
      return;
    }

    this._timer = setTimeout(() => {
      const nowDate = Date.now();
      this._diffTime =
        Math.floor((nowDate - this._date) / this._speed) * this._speed;
      this._countdown();
    }, this._speed);
  }

  public _computed(remainTime: number): RunningReturn {
    const day = Math.floor(remainTime / CountdownCore._DAY);
    remainTime = remainTime % CountdownCore._DAY;

    const hour = zeroPadding(Math.floor(remainTime / CountdownCore._HOUR));
    remainTime = remainTime % CountdownCore._HOUR;

    const minute = zeroPadding(Math.floor(remainTime / CountdownCore._MINUTE));
    remainTime = remainTime % CountdownCore._MINUTE;

    const second = zeroPadding(Math.floor(remainTime / CountdownCore._SECOND));
    remainTime = remainTime % CountdownCore._SECOND;

    const millisecond = Math.floor(remainTime / CountdownCore._MILLISECOND);

    return {
      day,
      hour,
      minute,
      second,
      millisecond,
    };
  }

  private _emit(type: CountdownStates, params?: RunningReturn): void {
    if (this._onEvents.hasOwnProperty(type)) {
      if (type === CountdownStates.RUNNING) {
        this._onEvents[type]?.forEach((handler) =>
          handler(params as RunningReturn),
        );
      } else {
        this._onEvents[type]?.forEach((handler) => handler());
      }
    }
  }
}
