declare global {
  namespace Express {
    interface Request {
      user?: {
        id_usuario?: string
      }
    }
  }
}

export {}