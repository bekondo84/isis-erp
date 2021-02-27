import { DataModelModule } from './data-model.module';

describe('DataModelModule', () => {
  let dataModelModule: DataModelModule;

  beforeEach(() => {
    dataModelModule = new DataModelModule();
  });

  it('should create an instance', () => {
    expect(dataModelModule).toBeTruthy();
  });
});
