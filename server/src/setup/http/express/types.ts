import express from 'express'

export interface APIRouter extends express.Router {}

export interface WebServer extends express.Express {}

export interface Express {
  apiRouter: APIRouter
  webServer: WebServer
}
