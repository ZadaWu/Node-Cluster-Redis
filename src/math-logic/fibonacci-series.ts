export class FibonacciSeries {
    public calculateFibonacciValue(n: number): number {
        // 处理边界情况
        if (n <= 0) {
            throw new Error('输入必须是正整数');
        }
        
        if (n === 1 || n === 2) {
            return 1;
        }

        let f1 = 1;
        let f2 = 1;
        
        for (let i = 3; i <= n; i++) {
            const temp = f2;
            f2 = f1 + f2;
            f1 = temp;
        }
        return f2;
    }
}
