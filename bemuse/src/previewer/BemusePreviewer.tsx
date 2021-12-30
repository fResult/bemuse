import './BemusePreviewer.scss'
import React, { useEffect, useReducer, useState } from 'react'
import { PreviewCanvas } from './PreviewCanvas'
import { PreviewInfo } from './PreviewInfo'
import { PreviewFileDropHandler } from './PreviewFileDropHandler'
import { loadPreview, setPreview } from './PreviewLoader'
import { createNullNotechartPreview } from './NotechartPreview'
import { previewStateReducer } from './PreviewState'
import { PreviewKeyHandler } from './PreviewKeyHandler'

export const BemusePreviewer = () => {
  const [previewState, dispatch] = useReducer(previewStateReducer, {
    currentTime: 50,
    hiSpeed: 1,
  })

  const [notechartPreview, setNotechartPreview] = useState(
    createNullNotechartPreview
  )

  useEffect(() => {
    loadPreview().then(setNotechartPreview)
  }, [])

  const onDrop = async (handle: FileSystemDirectoryHandle) => {
    await setPreview(handle)
    loadPreview().then(setNotechartPreview)
  }

  return (
    <div className='BemusePreviewer'>
      <div className='BemusePreviewerのheader'>
        <h1>
          <strong>Bemuse</strong> BMS/bmson previewer
        </h1>
      </div>
      <div className='BemusePreviewerのmain'>
        <PreviewCanvas
          notechartPreview={notechartPreview}
          previewState={previewState}
        />
        <PreviewInfo
          notechartPreview={notechartPreview}
          previewState={previewState}
        />
        <PreviewFileDropHandler onDrop={onDrop} />
        <PreviewKeyHandler dispatch={dispatch} />
      </div>
    </div>
  )
}
