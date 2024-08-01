export const initialState = {
  // Quote Information Page
  customerName: '',
  contactName: '',
  customerStreet: '',
  customerCity: '',
  customerState: '',
  customerZip: '',
  customerPhone: '',
  customerFax: '',
  customerCell: '',
  customerEmail: '',
  projectName: '',
  projectFor: '',
  projectAddress: '',
  projectCity: '',
  projectState: '',
  projectZip: '',
  projectCounty: '',
  buildingUse: '',
  // Design Code Page
  buildingCode: '',
  riskCategory: '',
  collateralLoad: '',
  liveLoad: '',
  deadLoad: '',
  windLoad: '',
  exposure: '',
  enclosure: '',
  groundLoad: '',
  roofLoad: '',
  thermalFactor: '',
  seismicCategory: '',
  seismicSs: '',
  seismicS1: '',
  seismicSms: '',
  seismicSm1: '',
  buildings: [
    {
      name: '',
      address: '',
      // ... other building-specific fields
    }
  ]
};