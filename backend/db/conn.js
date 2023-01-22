const {MongoClient} = require("mongodb");

const Db = process.env.MONGO_URI || "mongodb+srv://mongodb:test1234@cluster0.jhfxj3s.mongodb.net/test";

console.log(Db);

const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function(err, db) {
            if (db) {
                _db = db.db("test")
                console.log("Successfully connected to MongoDB");
                // const defaultProducts = [
                //     {
                //         name: "NIKE AIR FORCE 1 '07",
                //         description: "Marka Nike lubi sięgać w przeszłość i brać z niej to, co najlepsze! Tym razem nadała świeżości kultowemu modelowi Air Force 1.",
                //         price: 600,
                //         amount: 20,
                //         size: 45
                //     },
                //     {
                //         name: "AIR JORDAN 1 MID",
                //         description: "Spójrz na nowe Air Jordany i śmiało powiedz „I like it!”. Kultowy model w odświeżonej, młodzieżowej odsłonie zachwyca kolorystyką, jakością materiałów i wygodą!",
                //         price: 740,
                //         amount: 5,
                //         size: 43
                //     },
                //     {
                //         name: "AIR JORDAN 1 LOW",
                //         description: "AIR JORDAN 1 LOW nawiązują do swojego pierwowzoru z lat 80. Model od marki Jordan cieszy się niesłabnącą popularnością.",
                //         price: 720,
                //         amount: 15,
                //         size: 42
                //     }
                // ]

                // const addProducts = _db.collection("products").insertMany(defaultProducts);
            }
            return callback(err);
        });
    },
    getDb: function() {
        return _db;
    },
};