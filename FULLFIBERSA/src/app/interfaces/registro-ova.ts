export interface ovaToSend {
  ova:{
    binary: string,
    name_file: string,
    has_test: number
  },
  metaData: {
    autor_ova: string;
    name_ova: string;
    category_ova: string;
    subject_ova: string;
    description_ova: string;
    languaje_ova: string;
    publisher_ova: string;
    source_ova: string;
    relation_ova: string;
    coverage_ova: string;
    rights_ova: string;
    date_publication_ova: Date;
    format_ova:string;
  }
}

export interface ovaToReceive {
  message: string,
  dataOva: {
      binary: string,
      name_file: string,
      has_test: boolean,
      metadata_id: number,
      id: number
  },
  metaData: {
      autor_ova: string,
      name_ova: string,
      category_ova:string,
      subject_ova: string,
      description_ova: string,
      languaje_ova: string,
      publisher_ova: string,
      source_ova: string,
      relation_ova: string,
      coverage_ova: string,
      rights_ova: string,
      date_publication_ova: Date,
      format_ova: string,
      id: number
  }
}

