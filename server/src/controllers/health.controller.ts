import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/api";

type HealthCheckData = {
  uptime: number;
  timestamp: string;
};

export class HealthController {
  healthCheck: RequestHandler<unknown, ApiResponse<HealthCheckData>> = (_req, res) => {
    return res.status(200).json({
      success: true,
      message: "Server is healthy",
      data: {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    });
  };
}

export const healthController = new HealthController();
