const poolPromise = require('../config/dbConfig')
module.exports = {
    queryParam_None: async (...args) => {
        const query = args[0]
        let result
        const pool = await poolPromise;
        try {
            var connection = await pool.getConnection() // connection을 pool에서 하나 가져온다.
            result = await connection.query(query) || null // query문의 결과 || null 값이 result에 들어간다.
        } catch (err) {
            console.log(err)
            connection.rollback(() => {})
        } finally {
            pool.releaseConnection(connection) // waterfall 에서는 connection.release()를 사용했지만, 이 경우 pool.releaseConnection(connection) 을 해준다.
            return result
        }
    },
    queryParam_Arr: async (...args) => {
        const query = args[0]
        const value = args[1] // array
        let result
        try {
            var connection = await pool.getConnection() // connection을 pool에서 하나 가져온다.
            result = await connection.query(query, value) || null // 두 번째 parameter에 배열 => query문에 들어갈 runtime 시 결정될 value
        } catch (err) {
            connection.rollback(() => {})
            next(err)
        } finally {
            pool.releaseConnection(connection) // waterfall 에서는 connection.release()를 사용했지만, 이 경우 pool.releaseConnection(connection) 을 해준다.
            return result
        }
    },
    queryParam_Parse: async (inputquery, inputvalue) => {
        const query = inputquery
        const value = inputvalue
        let result
        try {
            var connection = await pool.getConnection()
            result = await connection.query(query, value) || null
            console.log(result)
        } catch (err) {
            console.log(err)
            connection.rollback(() => {})
            next(err)
        } finally {
            pool.releaseConnection(connection)
            return result
        }
    },
    Transaction: async (...args) => {
        let result = "Success"
        try {
            var connection = await pool.getConnection()
            await connection.beginTransaction()
            await args[0](connection, ...args)
            await connection.commit()
        } catch (err) {
            await connection.rollback()
            console.log("mysql error! err log =>" + err)
            result = undefined
        } finally {
            pool.releaseConnection(connection)
            return result
        }
    }
}