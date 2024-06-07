import { ScrollView, View } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { useData } from "../utils/Hooks";
import { DIMENSIONS } from "../utils/constants";
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@rneui/themed";
import Toast from 'react-native-toast-message';
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import { useState } from "react";
import * as Haptics from 'expo-haptics';

export const JsonViewer = () => {
    const { globalData } = useData()
    const [fetching, setFetching] = useState<boolean>(false)

    const copyToClipboard = async (): Promise<void> => {
        try {
            setFetching(true)
            await Clipboard.setStringAsync(JSON.stringify(globalData))
            Toast.show({
                topOffset: 60,
                type: 'success',
                text1: 'Saved documents! 🎉',
            });
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
        } catch (e) {
            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: `Error copying to clipboard! 🤯`,
            });
        }
        finally {
            setFetching(false)

        }

    }


    const createHTMLTemplate = (content: string) => {
        return `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            </head>
            <body>
             ${content}
            </body>
        </html>
        
        `
    }
    const createHTML = () => {
        return `<ul inert>
         ${globalData.map(data => `
            <li style="margin-top:20px">
                <div style="border: 2px solid black; padding: 10px; display:flex; flex-direction:column; gap:20px;border-radius: 10px;">
                    <h1>Amount: ${data.amount}</h1>
                    <p>Date: ${data.date}</p>
                    ${data.photoUri.map(uri => `<img src="data:image/jpeg;base64,${uri.photoUri}"   style="max-width: 100%; height: auto; display: block; margin: 0 auto;"/>`).join('')}
                </div>
            </li>
         `).join('')}
         </ul>`
    }
    const createAttachments = async () => {
        const images = globalData
            .map(data => data.photoUri)
            .flat()
            .map(uri => ({ base: `${uri.photoUri}`, filePath: `${FileSystem.cacheDirectory}image${uri.id}.jpg` }))

        await Promise.all(images.map(item => FileSystem.writeAsStringAsync(item.filePath, item.base, {
            encoding: FileSystem.EncodingType.Base64,
        })))

        return images.map(item => item.filePath)
    }
    const sendEmail = async () => {
        try {
            setFetching(true)
            const isAvailable = await MailComposer.isAvailableAsync();
            if (isAvailable) {
                const jsonContent = JSON.stringify(globalData);
                const fileUri = `${FileSystem.documentDirectory}data.json`;
                await FileSystem.writeAsStringAsync(fileUri, jsonContent);
                const res = await MailComposer.composeAsync({
                    recipients: ['davidmanolo_97@hotmail.com'],
                    subject: 'Comprobante de gastos',
                    body: 'foo',
                    attachments: [fileUri]
                });
                console.log(res)
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                )
                console.log('enviando')
            } else {
                console.log('Email is not available on this device');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
        finally {
            setFetching(false)
        }
    };

    return (
        <View style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            display: 'flex'
        }}>
            <ScrollView style={{
                maxHeight: DIMENSIONS.HEIGHT - 200, width: DIMENSIONS.WIDTH - 20, padding: 10
            }}>
                <CodeHighlighter language="typescript" hljsStyle={atomOneDarkReasonable} scrollViewProps={{ contentContainerStyle: { width: DIMENSIONS.WIDTH - 20 } }}>

                    {JSON.stringify(globalData.map(data => ({ ...data, photoUri: data.photoUri.length })), null, 2)}
                </CodeHighlighter>
            </ScrollView>
            <View style={{ width: DIMENSIONS.WIDTH - 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                    radius={'sm'}
                    type="solid"
                    buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
                    onPress={sendEmail}
                    loading={fetching}
                >
                    Send to email
                </Button>
                <Button
                    buttonStyle={{
                        backgroundColor: 'rgba(111, 202, 186, 1)',
                        borderRadius: 5,
                    }}
                    radius={'sm'}
                    type="solid"
                    onPress={copyToClipboard}
                    loading={fetching}
                >
                    Copy to clipboard
                </Button>
            </View>
        </View>
    )
}