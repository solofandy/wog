class Wogapi {
    config = {
        version: "9.0.0r78410",
    }

    CALL =  `https://pcmob.parse.gemsofwar.com/call_function`

    async Call(request) {
        try {
            const response = await fetch(this.CALL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(request)
            })
            const ans = await response.json()
            if (!ans.result) {
                return false;
            }
            else {
                // console.log(ans.result)
                return ans.result
            }
        }
        catch(e) {
            return false;
        }
    }

    async GetUserId(usercode) {
        const req = {
            clientVersion: this.config.version,
            functionName: `download_user_names`,
            platform: `PC_CLIENT`, 
            SearchText: usercode,
            StartAt: 0,
            Limit: 500
        }
        try {
            const ans = await this.Call(req)
            if (!ans || !ans.Usernames || ans.Usernames.length <= 0) {
                return null
            }
            else {
                return ans.Usernames[0].Id;
            }
        }
        catch(e) {
            return false;
        }
    }

    async GetUserProfile(id) {
        const req = {
            clientVersion: this.config.version,
            platform: `PC_CLIENT`,
            functionName: `get_hero_profile`,
            Id: id
        }
        try {
            const ans = await this.Call(req)
            if (!ans || !ans.ProfileData || !ans.ProfileData.username) {
                return null
            }
            else {
                return ans.ProfileData;
            }
        }
        catch(e) {
            return false;
        }
    }

    async GetUnderspire(username, password, eventid) {
        const req = {
            username, 
            password,
            clientVersion: this.config.version,
            platform: `PC_CLIENT`,
            functionName: `live_event_get_info`,
            LiveEventType: 17,
            LiveEventId: eventid
        }
        try {
            const ans = await this.Call(req)
            if (!ans || !ans.Info) {
                return null
            }
            else {
                return ans.Info;
            }
        }
        catch(e) {
            return false;
        }
    }

}

const $wog = new Wogapi();