import styles from "@/styles/loading.module.css"

export function Loading() {
  return (
    <div className={styles['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
  )
}