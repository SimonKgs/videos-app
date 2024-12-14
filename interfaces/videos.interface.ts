
export interface User {
    createdAt: Date; // Default: now()
    email: string; // Unique
    id: string; // UUID
    name: string;
    token?: string;
    password: string;
    videos: Video[]; // Relationship with Video model
}

export interface Videos {
    videos: Video[];
    user: User;
}

export interface Video {
    accessMode: string; 
    assetId: string; 
    bytes: number;
    createdAt: Date; 
    folder: string | null;
    format: string;
    height: number;
    id: string; 
    likes: number; 
    name?: string | null; 
    publicId: string; // 
    resourceType: string;
    secureUrl: string;
    timesWatched: number; 
    type: string; 
    url: string;
    user?: User;
    userId: string;
    version: number;
    width: number;
  }
  