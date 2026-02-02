export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  maxGuests: number;
}

export interface DiningVenue {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  cuisine: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface SearchResult {
  text: string;
  sources: {
    uri: string;
    title: string;
  }[];
}

export interface GroundingChunk {
    web?: {
        uri?: string;
        title?: string;
    };
    maps?: {
        uri?: string;
        title?: string;
    }
}
