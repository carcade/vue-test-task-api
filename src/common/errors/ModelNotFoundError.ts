export default class ModelNotFoundError extends Error {
    public constructor(message?: string) {
        super(message ?? 'model not found')
    }
}
