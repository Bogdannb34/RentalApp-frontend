
import { RentalLocation } from "./rental-location";
import { User } from "./user";

export class Rental {
    public id: number;
    public type: string;
    public name: string;
    public address: string;
    public description: string;
    public maxPeople: number;
    public beds: number;
    public bathrooms: number;
    public bedrooms: number;
    public mainImage: string;
    public rule: string;
    public amenities: string;
    public priceOvernight: number;
    public location: RentalLocation;
    public host: User;
    
    constructor() {
        this.type = '';
        this.name = '';
        this.address = '';
        this.description = '';
        this.maxPeople = null;
        this.beds = null;
        this.bathrooms = null;
        this.bedrooms = null;
        this.rule = '';
        this.amenities = '';
        this.priceOvernight = null;
    }
};