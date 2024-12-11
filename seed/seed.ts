interface SeedVideo {
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


interface SeedData {
    resources: SeedVideo[],
}


export const initialData: SeedData = {
    resources: [
        {
            asset_id: "c9812081343f73b292b7e679c79aa523",
            public_id: "videos/asd-1733738816888",
            format: "mp4",
            version: 1733738827,
            resource_type: "video",
            type: "upload",
            created_at: "2024-12-09T10:07:07Z" as unknown as Date,
            bytes: 29243769,
            width: 2560,
            height: 1440,
            folder: "videos",
            access_mode: "public",
            url: "http://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4",
            secure_url: "https://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4"
        },
        {
            asset_id: "c9812081343f73b292b7e679c79aa525",
            public_id: "videos/asd-1733738816888",
            format: "mp4",
            version: 1733738827,
            resource_type: "video",
            type: "upload",
            created_at: "2024-12-09T10:07:07Z" as unknown as Date,
            bytes: 29243769,
            width: 2560,
            height: 1440,
            folder: "videos",
            access_mode: "public",
            url: "http://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4",
            secure_url: "https://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4"
        },
        {
            asset_id: "c9812081343f73ba92b7e679c79aa525",
            public_id: "videos/asd-1733738816888",
            format: "mp4",
            version: 1733738827,
            resource_type: "video",
            type: "upload",
            created_at: "2024-12-09T10:07:07Z" as unknown as Date,
            bytes: 29243769,
            width: 2560,
            height: 1440,
            folder: "videos",
            access_mode: "public",
            url: "http://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4",
            secure_url: "https://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4"
        },
        {
            asset_id: "c9812081343f73b292s7e679c79aa525",
            public_id: "videos/asd-1733738816888",
            format: "mp4",
            version: 1733738827,
            resource_type: "video",
            type: "upload",
            created_at: "2024-12-09T10:07:07Z" as unknown as Date,
            bytes: 29243769,
            width: 2560,
            height: 1440,
            folder: "videos",
            access_mode: "public",
            url: "http://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4",
            secure_url: "https://res.cloudinary.com/dtts0tqni/video/upload/v1733738827/videos/asd-1733738816888.mp4"
        },
    ]
}