export default function (text: String) : string {
    let hash = 0;
    for (let c in text) {
        hash = Number(((hash << 5) - hash) + c);
        hash &= hash;
    }
    return String(hash);
}
