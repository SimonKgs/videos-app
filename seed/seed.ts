interface SeedVideo {
    accessMode:   "public" | "private";
    assetId:      string;
    bytes:         number;
    folder:        string;
    format:        string;
    height:        number;
    likes?:        number;
    name?:         string;
    publicId:     string;
    resourceType: "video";
    secureUrl:    string;
    times_watched?: number; 
    type:          "upload";
    url:           string;
    version:       number;
    width:         number;
    userId:       string;
    // cloudinary response is like: 
    // access_mode, asset_id, public_id, resource_type, user_id, secure_url
}


interface SeedUser {
    name: string;
    email: string;
    password: string;
}


interface SeedData {
    resources: SeedVideo[],
    users: SeedUser[]
}


export const initialData: SeedData = {
    users: [
        
    ],
    resources: [
        {
            assetId: "c9812081343f73b292b7e679c79aa523",
            publicId: "videos/asdX-1733738816888",
            format: "mp4",
            version: 1733738827,
            resourceType: "video",
            type: "upload",
            bytes: 29243769,
            width: 2560,
            height: 1440,
            folder: "videos",
            accessMode: "public",
            url: "http://res.cloudinary.com/dtts0tqni/video/upload/v1733740185/videos/asdasd-1733740182567.mp4",
            secureUrl: "https://res.cloudinary.com/dtts0tqni/video/upload/v1733740185/videos/asdasd-1733740182567.mp4",
            userId: "1"
        },
        {
            assetId: "c9812081343fasd73b292b7e679c79aa523",
            publicId: "videos/asdR-1733738816888",
            format: "mp4",
            version: 1733738827,
            resourceType: "video",
            type: "upload",
            bytes: 29243769,
            width: 2560,
            height: 1440,
            folder: "videos",
            accessMode: "public",
            url: "http://res.cloudinary.com/dtts0tqni/video/upload/v1733759475/videos/fasd5-1733759462950.mp4",
            secureUrl: "https://res.cloudinary.com/dtts0tqni/video/upload/v1733759475/videos/fasd5-1733759462950.mp4",
            userId: "1"
        },
    ]
}