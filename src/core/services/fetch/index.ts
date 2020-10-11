interface HttpResponse<T> extends Response {
  parsedBody?: T
}
/**
 * Wrapper for Http Request.
 * Uses fetch API.
 */
class Fetch {
  headers: Record<string, string> = {
    market: 'marketId',
    'data-version': 'dataVersion[sessionUser.currentMarket]',
    'Content-Type': 'application/json',
  }

  host: string | undefined = undefined

  useMock = false

  /*
   * ------------------------------------
   * SERVICE INIT
   * ------------------------------------
   */

  constructor () {
    console.log('process.env.VUE_APP_MOCK_ENABLED', process.env.VUE_APP_MOCK_ENABLED)
    this.useMock = process.env.VUE_APP_MOCK_ENABLED
  }

  /**
   * This function allows to give a specific backend host
   *
   * @param {String} host The backend host
   */
  addHost (host: string) {
    this.host = host
  }

  /**
   * Format an object into a query param such as `a=1&b=2`
   *
   * @param {Object} obj The params Object to convert into a usable query string
   */
  objectToQueryString<P extends { [key: string]: string[] }> (obj: P) {
    return Object.keys(obj)
      .map((key) => {
        if (Array.isArray(obj[key])) {
          return obj[key].map((val) => `${key}=${val}`)
            .join('&')
        }

        return `${key}=${obj[key]}`
      })
      .join('&')
  }

  /**
   * Fetch the data from the mock file related to the given endpoint
   *
   * @param {Object} param The url object wrapper
   * @param {String} param.url The API endpoint
   */
  fetchMock<P> ({ url }: { url: string }): Promise<P> {
    return new Promise((resolve) => {
      console.log('[Req][Mock][%s]', url)
      import(`./api_mock/${url.slice(1)
        .replace(/\//g, '.')}.js`)
        .then((data) => {
          console.log('[Resp][Mock][%s] %o', url, data)
          resolve(data.default)
        })
    })
  }

  /**
   * Fetch function that prepare the request params and handle the response
   *
   * @param {Object} param The request parameters
   * @param {String} param.url The API endpoint
   * @param {Object} param.params The Request param
   * @param {String} param.method The Request method
   * @param {Function} param.errorCallback Callback to execute if there is an error
   * @param {Function} param.successCallback Callback to execute if the request is successful
   */
  async request<P> ({ url, params, method = 'GET', errorCallback, successCallback, forceMock }: {
    url: string
    params?: { [key: string]: string[] }
    method: string
    errorCallback?: (error?: any) => void
    successCallback?: (json: P | undefined) => void
    forceMock?: boolean
  }): Promise<P> {
    //
    // Return the Mocks straight away
    //
    if (this.useMock || forceMock) {
      return this.fetchMock<P>({ url })
    }

    console.log(`[Req][${method}][%s] %o`, url, params)

    //
    // Http Request builder
    //
    let link = url
    let body

    if (params) {
      if (method === 'GET') {
        link += `?${this.objectToQueryString(params)}`
      } else {
        // Body should match Content-Type in headers option
        body = JSON.stringify(params)
      }
    }

    //
    // Http Request
    //
    const response: HttpResponse<P> = await fetch(link, {
      method,
      headers: this.headers,
      body,
    })

    //
    // Http Response Status Error
    //
    if (response.status !== 200) {
      console.log(`[Resp-Err][${method}][%s][%s] %o`, url, response.status, response)
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback(response)
      } else {
        const errorString = await response.json()

        throw new Error(errorString)
      }
    }

    //
    // Http Response Status Success
    //
    try {
      console.log(`[Resp-success][${method}][%s][%s] %o`, url, response.status, response)

      response.parsedBody = await response.json()

      if (!response.parsedBody) {
        throw new Error()
      }

      if (successCallback && typeof successCallback === 'function') {
        successCallback(response.parsedBody)
      }

      return response.parsedBody
    } catch (error) {
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback(error)
      }
      throw new Error('Unable to parse Http response')
    }
  }

  /**
   * Http GET method wrapper
   *
   * @param {String} url The API endpoint
   * @param {Object} params The Request param
   */
  async get<P> (url: string, params?: { [key: string]: string[] }, forceMock?: boolean): Promise<P> {
    return this.request<P>({ url, method: 'GET', params, forceMock })
  }

  /**
   * Http POST method wrapper
   *
   * @param {String} url The API endpoint
   * @param {Object} params The Request param
   */
  async post<P> (url: string, params: { [key: string]: string[] }) {
    return this.request<P>({ url, method: 'POST', params })
  }

  /**
   * Http POST method wrapper
   *
   * @param {String} url The API endpoint
   * @param {Object} params The Request param
   */
  async put<P> (url: string, params: { [key: string]: string[] }) {
    return this.request<P>({ url, method: 'PUT', params })
  }

  /**
   * Http DELETE method wrapper
   *
   * @param {String} url The API endpoint
   * @param {Object} params The Request param
   */
  async delete<P> (url: string, params: { [key: string]: string[] }) {
    return this.request<P>({ url, method: 'DELETE', params })
  }

  /**
   * Http UPDATE method wrapper
   *
   * @param {String} url The API endpoint
   * @param {Object} params The Request param
   */
  async update<P> (url: string, params: { [key: string]: string[] }) {
    return this.request<P>({ url, method: 'UPDATE', params })
  }
}

/**
 * Singleton wrapper for HTTP requests
 */
export const http = new Fetch()
