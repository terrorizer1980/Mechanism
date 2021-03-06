class Vector2 {
    constructor(public x = 0, public y = 0) { }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs + rhs);
    }

    subtract(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs - rhs);
    }

    multiply(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs * rhs);
    }

    divide(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs / rhs);
    }

    private combine(value: Vector2 | number, fn: (lhs: number, rhs: number) => number): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(fn(this.x, value.x), fn(this.y, value.y));
        }
        else {
            return new Vector2(fn(this.x, value), fn(this.y, value));
        }
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    mutate(): Vector2Mutator {
        return new Vector2Mutator(this);
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    static get half(): Vector2 {
        return new Vector2(0.5, 0.5);
    }

    static get one(): Vector2 {
        return new Vector2(1, 1);
    }
}