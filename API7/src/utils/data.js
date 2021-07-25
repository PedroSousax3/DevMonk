const diaDaSemana = [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" ]
const meses = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];

export function dayOfWeek (data) {
    return diaDaSemana[new Date(data).getDay()]
}

export function mes (data) {
    return meses[new Date(data).getMonth()]
}

export default function montarObjetoData (data) {
    try {
        if (typeof data == "string" && data.length == 10)
            data += " 00:00:00";
        data = new Date(data);
    
        if (data == null || data == undefined) {
            throw "Data informada está incorreta."
        }

        let result = {
            data : data,
            diaDoMes : data.getDate(),
            diaDaSemana : new Date().toLocaleDateString() === data.toLocaleDateString() ? "Hoje" : dayOfWeek(data),
            dateString : (data != undefined && data != null) ? data.toJSON().substr(0, 10) : "",
            timeString : data.toLocaleTimeString(),
            nomeMes : mes(data)
        }

        return result;
    } catch (err) {
        console.log(err);
    }
}