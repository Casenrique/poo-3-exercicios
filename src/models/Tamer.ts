export class Tamer {
    constructor(
        private id: string,
        private name: string,
        private createdAt: string
    ){}

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }
    
    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public setId(value: string): void {
        this.id = value
    }

    public setName(value: string): void {
        this.id = value
    }
    
    public setCreatedAt(value: string): void {
        this.id = value
    }
}