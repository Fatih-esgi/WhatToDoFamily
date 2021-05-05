import { WeatherDBFilterPipe } from './weather-dbfilter.pipe';

describe('WeatherDBFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherDBFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
