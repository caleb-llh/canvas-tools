export function norm(value, min, max) {
    return (value - min) / (max - min);
}

export function lerp(norm, min, max) {
    return (max - min) * norm + min;
}

export function deg_to_rad(deg){
    return Math.PI*deg/180
}

