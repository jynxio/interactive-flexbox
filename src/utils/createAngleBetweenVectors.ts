import { Radian, Vector } from '@/types';

/**
 * 计算二维向量v1至v2的逆时针夹角（弧度）
 * @example
 * const v1 = { x: 1, y: 0 };
 * const v2 = { x: 0, y: 1 };
 * f(v1, v2); // Math.PI / 2
 */
export default function (v1: Vector, v2: Vector): Radian {
    // 计算两个向量之间的角度
    const angle = Math.acos(createDotProduct(v1, v2) / (createMagnitude(v1) * createMagnitude(v2)));

    // 使用叉积判断旋转方向，如果叉积非负，则直接返回
    if (createCrossProduct(v1, v2) >= 0) return angle;

    // 否则返回补角
    return Math.PI * 2 - angle;

    function createDotProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    function createCrossProduct(v1: Vector, v2: Vector): number {
        return v1.x * v2.y - v1.y * v2.x;
    }

    function createMagnitude(v: Vector): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}
