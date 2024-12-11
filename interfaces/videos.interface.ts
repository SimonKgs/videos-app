export interface Video {
    //todo: id:            string;
    access_mode:   "public" | "private";
    asset_id:      string;
    bytes:         number;
    created_at:    Date;
    folder:        string;
    format:        string;
    height:        number;
    likes?:        number;
    name?:         string;
    public_id:     string;
    resource_type: "video";
    secure_url:    string;
    times_watched?: number; 
    type:          "upload";
    url:           string;
    version:       number;
    width:         number;
}


export interface Videos {
    videos: Video[],
}