import {Sequelize} from "sequelize";
import {DataTypes} from "sequelize";
import sequelize from '../config/db.js';



let UserModel=sequelize.define("User",{
    username:{
        type:DataTypes.STRING,
        required:true
    },
    email:{
        type:DataTypes.STRING,
        required:true
    },
    number:{
        type:DataTypes.STRING,
        required:true
    },
    states:{
        type:DataTypes.STRING,
        required:true
    },
    city:{
        type:DataTypes.STRING,
        required:true
    },
    password:{
        type:DataTypes.STRING,
        required:true
    }
});
// 2. State Directory Master Table Definition
export let StateModel = sequelize.define("State", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'states' });

// 3. City Directory Master Table Definition
export let CityModel = sequelize.define("City", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    state_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'cities' });

// Relational Mappings (Primary Key to Foreign Key linkages)
StateModel.hasMany(CityModel, { foreignKey: 'state_id' });
CityModel.belongsTo(StateModel, { foreignKey: 'state_id' });


export default UserModel;