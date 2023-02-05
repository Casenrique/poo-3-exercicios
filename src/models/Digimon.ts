export class Digimon {
    constructor(
        private id: string,
        private name: string,
        private stage: string,
        private attribute: string,
        private createdAt: string
    ){}

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }

    public getStage = (): string => {
        return this.stage
    }

    public getAttribute = (): string => {
        return this.attribute
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
    public setStage(value: string): void {
        this.id = value
    }
    public setAttribute(value: string): void {
        this.id = value
    }
    public setCreatedAt(value: string): void {
        this.id = value
    }
}