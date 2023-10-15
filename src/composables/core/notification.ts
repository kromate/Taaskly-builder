const ALERT_DURATION = 5000

const openAlertArray = ref([] as Record<string, any>[])

interface AlertTypes {
	type: 'Alert' | 'ERROR' | 'SUCCESS'
	msg: string
}

export const useAlert = () => {
	const openAlert = ({ type, msg }: AlertTypes) => {
		const id = Date.now().toString()
		openAlertArray.value.push({ id, type, msg })
	}
	const closeAlert = (id:string) => {
		openAlertArray.value = openAlertArray.value.filter((alert: any) => alert.id !== id)
	}

	return { openAlert, closeAlert, ALERT_DURATION, openAlertArray }
}
