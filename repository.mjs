import Sequelize from 'sequelize';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './repository.db',
	define: {
		timestamps: true
	}
});

const Company = sequelize.define('company', {
	id: {
		allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING,
		validate: {
			min: 3
		},
		allowNull: false
	},
	date: {
		type: Sequelize.DATE,
		allowNull: false
	}
});

const Founder = sequelize.define('founder', {
	id: {
		allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING,
		validate: {
			min: 5
		},
		allowNull: false
	},
	role:{
        type: Sequelize.ENUM(
			"CFO",
			"CISO",
            "CEO",
            "CTO"
          ),
        allowNull:false,

    }
});

Company.hasMany(Founder, {foreignKey: 'companyId'});
Founder.belongsTo(Company, {foreignKey: 'companyId'});

async function initialize() {
	await sequelize.authenticate();
	await sequelize.sync({alter: true});
}

export {
	initialize,
	Company, Founder
}