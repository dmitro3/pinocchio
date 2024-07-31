import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bronzeCoinIcon from '../../../assets/pictures/coins/bronze/coin_front.svg'
import goldenCoinIcon from '../../../assets/pictures/coins/golden/coin_front.svg'
import silverCoinIcon from '../../../assets/pictures/coins/silver/coin_front.svg'
import goldenKeyIcon from '../../../assets/pictures/keys/golden.svg'
import silverKeyIcon from '../../../assets/pictures/keys/silver.svg'
import personIcon from '../../../assets/pictures/person.svg'
import axiosDB from '../../../utils/axios/axiosConfig'
import { getId } from '../../../utils/config'
import { numberWithSpaces } from '../../../utils/filterNumbers'
import formatDate from '../../../utils/formatDate/formatDate'
import { Loader } from '../../ui/Loader/Loader'
import Navigation from '../../ui/Navigation/Navigation'
import Loading from '../Loading/Loading'
import './Wallet.css'

const Wallet = () => {
	const telegramId = getId()
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState({})
	const [statistic, setStatistic] = useState({})

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axiosDB.get(`/user/${telegramId}`)
				const user = response.data
				setUserData(user)
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setLoading(false)
			}
		}
		const getStatistic = async () => {
			try {
				const response = await axiosDB.get('/statistic')
				setStatistic(response.data)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		getStatistic()

		fetchUserData()
	}, [telegramId])
	console.log(userData)
	if (loading) {
		return <Loading />
	}
	return (
		<div className='container wallet'>
			<Link to='/stats' className='stats wallet'>
				<div id='coins'>
					<div className='icon'>
						<img src={personIcon} alt='' />
					</div>
					<div className='icon'>
						<img src={personIcon} alt='' />
					</div>
					<div className='icon'>
						<img src={goldenCoinIcon} alt='' />
					</div>
				</div>
				<p id='users-count'>{numberWithSpaces(statistic.totalUsers)}</p>
				<p>Pinocchio coin miners</p>
				<span>
					Stats
					<svg
						className='row'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M8 4.5L16 12.5L8 20.5'
							stroke='#00000080'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</span>
			</Link>
			{userData.upgradeBoosts ? (
				<div className='user-block'>
					<div className='icon'>
						{userData && userData.upgradeBoosts[1].level === 2 ? (
							<img src='/boosts/skin.svg' alt='' />
						) : (
							<img src={bronzeCoinIcon} alt='' />
						)}
					</div>
					<h3 id='username'>@{userData.username}</h3>
					<p id='started-date'>{formatDate(userData.createdAt)}</p>
				</div>
			) : (
				<Loader />
			)}

			<div className='block user-balance'>
				<div className='balance-item'>
					<div className='icon'>
						<img src={silverKeyIcon} alt='' />
					</div>
					<p className='count'>{numberWithSpaces(userData.soldoTaps)}</p>
				</div>
				<div className='balance-item'>
					<div className='icon'>
						<img src={goldenKeyIcon} alt='' />
					</div>
					<p className='count'>{numberWithSpaces(userData.zecchinoTaps)}</p>
				</div>
				<div className='balance-item'>
					<div className='icon'>
						<img src={silverCoinIcon} alt='' />
					</div>
					<p className='count'>{numberWithSpaces(userData.soldo)}</p>
				</div>
				<div className='balance-item'>
					<div className='icon'>
						<img src={goldenCoinIcon} alt='' />
					</div>
					<p className='count'>{numberWithSpaces(userData.zecchino)}</p>
				</div>
				<div className='balance-item'>
					<div className='icon'>
						<img src={bronzeCoinIcon} alt='' />
					</div>
					<p className='count'>{numberWithSpaces(userData.coins)}</p>
				</div>
			</div>
			<Navigation />
		</div>
	)
}

export default Wallet
