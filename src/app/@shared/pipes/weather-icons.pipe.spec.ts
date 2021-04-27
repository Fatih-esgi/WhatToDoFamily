import { WeatherIconsPipe } from './weather-icons.pipe';

describe('WeatherIconsPipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherIconsPipe();
    expect(pipe).toBeTruthy();
  });
});
