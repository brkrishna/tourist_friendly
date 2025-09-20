import { describe, it, expect } from 'vitest'

describe('GET /api/attractions/{id}/live-data - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should retrieve real-time data for attraction', async () => {
    const attractionId = 'attraction_001'
    const response = await fetch(`${baseUrl}/api/attractions/${attractionId}/live-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData.attractionId).toBe(attractionId)
    expect(responseData).toHaveProperty('realTimeData')
    expect(responseData).toHaveProperty('alerts')
    expect(responseData).toHaveProperty('recommendations')
    
    const realTimeData = responseData.realTimeData
    expect(realTimeData).toHaveProperty('crowdLevel')
    expect(realTimeData).toHaveProperty('waitTime')
    expect(realTimeData).toHaveProperty('currentCapacity')
    expect(realTimeData).toHaveProperty('maxCapacity')
    expect(realTimeData).toHaveProperty('operationalStatus')
    expect(realTimeData).toHaveProperty('lastUpdated')
    
    expect(Array.isArray(responseData.alerts)).toBe(true)
    
    if (responseData.alerts.length > 0) {
      const alert = responseData.alerts[0]
      expect(alert).toHaveProperty('type')
      expect(alert).toHaveProperty('message')
      expect(alert).toHaveProperty('severity')
    }
  })

  it('should return 404 for non-existent attraction', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/non_existent/live-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(404)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('NOT_FOUND')
  })
})