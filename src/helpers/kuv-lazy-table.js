const { Op } = require('sequelize');

const kuv_lazy_table = ( action = {} ) => {
    //Paginación tabla
    let opts = {
        offset: (action.page - 1) * action.pageSize, 
        limit: action.pageSize
    }

    //Opts para contador de tabla
    let opts_count = {}

    //Ordenamiento tabla
    if (action.sorted) {

        if (action.order) {
            opts.order = action.order
        } else {
            opts.order = [[action.sorted_by, (action.sorted_asc) ? 'ASC' : 'DESC']]
        }
    }

    //Filtro de tabla
    if (action.filtered) {

        const filtros = action.filters

        let condiciones = [];

        for (let index = 0; index < filtros.length; index++) {
            condiciones.push({[filtros[index].column]: { [Op[filtros[index].op]]: (filtros[index].op === 'like') ? '%'+filtros[index].value+'%' : filtros[index].value }});
        }
        
        opts.where = {
            [Op.and]: condiciones
        }

        opts_count.where = {
            [Op.and]: condiciones
        }

    }

    return {opts, opts_count};
}

module.exports = {
    kuv_lazy_table
}