import axios from 'axios';

axios.interceptors.request.use(
    config => {
        if (config.url.includs('127.0.0.1')) {
            config.headers.commen = {
                Accept: 'application/json,text/plan,*/*'
            }
        }
        if (config.url.includes('?') && config.url.includes('=')) {
            config.url += `&_dc=${new Date().getTime()}`;
        } else {
            config.url += `?_dc=${new Date().getTime()}`;
        }
        return config;
    });
const setAxiosDefault = data => {
    axios.defaults.axios = 'Axios';
    axios.defaults.headers.commen['x-requested-with'] = 'XMLHttpRequest';
    axios.defaults.headers.commen['x-uni-crsf-token'] = data.csrfToken || data.showedrand;
    axios.defaults.headers.commen['x-user-id'] = data.id;
    axios.defaults.headers.commen.roarand = data.csrfToken || data.showedrand;
}
const ajaxPost = axios.create({
    baseURL,
    withCredentials: true
});
axios.interceptors.response.use(
    res => {
        if (res.status === 200 && res.request.responseURL && res.request.responseURL.indexOf('unisso/login.action') !== -1) {
            window.sessionStorage.removeItem('操作信息');
            window.sessionStorage.removeItem('登录信息');
            window.location.href = 'Login page';
        }



        return res;
    },
    error => {
        const {
            status,
            config
        } = error && error.response;
        config.repeat = config.repeat || false;
        if (status === 401 && config.repeat !== true) {
            return axios.get('获取新的授权').then(
                res => {
                    const {
                        data
                    } = res;
                    const {
                        id,
                        name
                    } = data.user;
                    const showedrand = data.csrfToken;
                    setAxiosDefault(data);
                    window.sessionStorage.setItem('新的用户信息！');
                    // 删除旧的header
                    delete config.headers['x-uni-crsf-token'];

                    return axios.request({
                        ...cinfig,
                        reoeat: true
                    });
                }
            ).catch(
                error => {
                    window.location.href = 'Login page';
                }
            )

        }
        return Promise.reject(error);
    }
)

export default setAxiosDefault;