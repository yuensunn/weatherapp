import SQLite from 'react-native-sqlite-storage'

export default SQLite.openDatabase({ name: "test.db", createFromLocation: "~weather.db" })