const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    html_url: { type: String },
    description: { type: String },
    created_at: { type: String },
    open_issues: { type: Number },
    watchers: { type: Number },
    owner: {
        id: { type: Number },
        avatar_url: { type: String },
        html_url: { type: String },
        type: { type: String },
        site_admin: { type: Boolean }
    }
}, {
    versionKey: false
})

const repoModel = mongoose.model('repos', repoSchema);

module.exports = {repoModel};