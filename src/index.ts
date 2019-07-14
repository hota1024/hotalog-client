import { Client } from './Clients/Client'

const hotalog = new Client()

export default hotalog
export const FileUploader = import('./FileUploader/FileUploader')
export const Article = import('./Models/Article')
export const Tag = import('./Models/Tag')
export const UploadFile = import('./Models/UploadFile')
