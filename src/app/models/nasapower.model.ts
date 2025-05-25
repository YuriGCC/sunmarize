export interface nasapower {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number, number];
  };
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DWN: Record<string, number>;
    };
  };
  header: {
    title: string;
    api: {
      version: string;
      name: string;
    };
    sources: string[];
    fill_value: number;
    time_standard: "LST" | string;
    start: string;
    end: string;
  };
  messages: string[];
  parameters: {
    ALLSKY_SFC_SW_DWN: {
      units: string;
      longname: string;
    };
  };
  times: {
    data: number;
    process: number;
  };
}
