export class FibonacciSeries {
    public calculateFibonacciValue(n: number): number {
        if (n <= 0) {
            return 0;
        }
        if (n === 1) {
            return 1;
        }

        let prev = 0;
        let current = 1;
        
        for (let i = 2; i <= n; i++) {
            const temp = current;
            current = prev + current;
            prev = temp;
        }

        return current;
    }
}
