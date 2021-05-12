export class Reservation {

    public id: number;
    public checkInDate: Date;
    public checkOutDate: Date;
    public guests: number;
    public totalCost: number;

    constructor() {
        this.checkInDate = null;
        this.checkOutDate = null;
        this.guests = null;
        this.totalCost = null;
    }
}