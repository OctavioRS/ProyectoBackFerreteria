import { AllUsersDtoService } from "../services/allUsersService.js"
import { loggerDev } from "../utils/loggers.js"
import { HttpResponse } from "../utils/http.response.js"
const Httpresponse = new HttpResponse();

export const AllUsersDtoController = async (req, res, next) => {
    try {
       const users = await AllUsersDtoService()
       res.json(users)
      } catch (error) {
        loggerDev.error(error.message)
        return new Httpresponse.NotFound(res, error)
    }
  }