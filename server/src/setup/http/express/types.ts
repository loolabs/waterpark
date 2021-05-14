import express from 'express'

export interface APIRouter extends express.Router {}

export interface WebServer extends express.Express {}

export interface WaterparkExpress {
  apiRouter: APIRouter
  webServer: WebServer
}
