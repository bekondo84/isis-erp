import { DataSourceModule } from './data-source.module';

describe('DataSourceModule', () => {
  let dataSourceModule: DataSourceModule;

  beforeEach(() => {
    dataSourceModule = new DataSourceModule();
  });

  it('should create an instance', () => {
    expect(dataSourceModule).toBeTruthy();
  });
});
